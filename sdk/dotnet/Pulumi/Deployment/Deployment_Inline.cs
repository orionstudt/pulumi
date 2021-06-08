﻿// Copyright 2016-2021, Pulumi Corporation

using System;
using System.Runtime.ExceptionServices;
using System.Threading.Tasks;

namespace Pulumi
{
    public partial class Deployment
    {
        private Deployment(InlineDeploymentSettings settings)
        {
            if (settings is null)
                throw new ArgumentNullException(nameof(settings));

            _projectName = settings.Project;
            _stackName = settings.Stack;
            _isDryRun = settings.IsDryRun;
            SetAllConfig(settings.Config, settings.ConfigSecretKeys);

            if (string.IsNullOrEmpty(settings.MonitorAddr)
                || string.IsNullOrEmpty(settings.EngineAddr)
                || string.IsNullOrEmpty(_projectName)
                || string.IsNullOrEmpty(_stackName))
            {
                throw new InvalidOperationException("Inline execution was not provided the necessary parameters to run the Pulumi engine.");
            }

            var deploymentLogger = settings.Logger ?? SerilogDeploymentLogger.Create();

            deploymentLogger.Debug("Creating Deployment Engine.");
            Engine = new GrpcEngine(settings.EngineAddr);
            deploymentLogger.Debug("Created Deployment Engine.");

            deploymentLogger.Debug("Creating Deployment Monitor.");
            Monitor = new GrpcMonitor(settings.MonitorAddr);
            deploymentLogger.Debug("Created Deployment Monitor.");

            _runner = new Runner(this, deploymentLogger);
            _logger = new EngineLogger(this, deploymentLogger, Engine);
        }

        internal static async Task<ExceptionDispatchInfo?> RunInlineAsync(InlineDeploymentSettings settings, Func<IRunner, Task<ExceptionDispatchInfo?>> func)
        {
            ExceptionDispatchInfo? exceptionDispatchInfo = null;

            await CreateRunnerAndRunAsync(
                () => new Deployment(settings),
                async runner =>
                {
                    exceptionDispatchInfo = await func(runner).ConfigureAwait(false);
                    return 1;
                })
                .ConfigureAwait(false);

            return exceptionDispatchInfo;
        }
    }
}
