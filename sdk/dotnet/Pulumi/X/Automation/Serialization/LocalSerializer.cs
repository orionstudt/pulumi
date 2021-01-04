﻿using System.Text.Json;
using System.Text.Json.Serialization;
using Pulumi.X.Automation.Serialization.Json;
using Pulumi.X.Automation.Serialization.Yaml;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace Pulumi.X.Automation.Serialization
{
    internal class LocalSerializer
    {
        private readonly JsonSerializerOptions _jsonOptions;
        private readonly IDeserializer _yamlDeserializer;
        private readonly ISerializer _yamlSerializer;

        public LocalSerializer()
        {
            // configure json
            this._jsonOptions = BuildJsonSerializerOptions();

            // configure yaml
            this._yamlDeserializer = BuildYamlDeserializer();
            this._yamlSerializer = BuildYamlSerializer();
        }

        public T DeserializeJson<T>(string content)
            where T : class
            => JsonSerializer.Deserialize<T>(content, this._jsonOptions);

        public T DeserializeYaml<T>(string content)
            where T : class
            => this._yamlDeserializer.Deserialize<T>(content);

        public string SerializeJson<T>(T @object)
            where T : class
            => JsonSerializer.Serialize(@object, this._jsonOptions);

        public string SerializeYaml<T>(T @object)
            where T : class
            => this._yamlSerializer.Serialize(@object);

        public static JsonSerializerOptions BuildJsonSerializerOptions()
        {
            var options = new JsonSerializerOptions
            {
                AllowTrailingCommas = true,
                IgnoreNullValues = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };

            options.Converters.Add(new JsonStringEnumConverter(new LowercaseJsonNamingPolicy()));
            options.Converters.Add(new MapToModelJsonConverter<ConfigValue, ConfigValueModel>());
            options.Converters.Add(new MapToModelJsonConverter<PluginInfo, PluginInfoModel>());
            options.Converters.Add(new MapToModelJsonConverter<ProjectSettings, ProjectSettingsModel>());
            options.Converters.Add(new MapToModelJsonConverter<StackSummary, StackSummaryModel>());
            options.Converters.Add(new ProjectRuntimeJsonConverter());
            options.Converters.Add(new StackSettingsConfigValueJsonConverter());

            return options;
        }

        public static IDeserializer BuildYamlDeserializer()
            => new DeserializerBuilder()
            .WithNamingConvention(LowerCaseNamingConvention.Instance)
            .IgnoreUnmatchedProperties()
            .WithTypeConverter(new ProjectRuntimeYamlConverter())
            .WithTypeConverter(new StackSettingsConfigValueYamlConverter())
            .Build();

        public static ISerializer BuildYamlSerializer()
            => new SerializerBuilder()
            .WithNamingConvention(LowerCaseNamingConvention.Instance)
            .ConfigureDefaultValuesHandling(DefaultValuesHandling.OmitNull)
            .WithTypeConverter(new ProjectRuntimeYamlConverter())
            .WithTypeConverter(new StackSettingsConfigValueYamlConverter())
            .Build();
    }
}
