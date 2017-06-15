// *** WARNING: this file was generated by the Lumi IDL Compiler (LUMIDL). ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

/* tslint:disable:ordered-imports variable-name */
import * as lumi from "@lumi/lumi";

import {ARN} from "../types";
import {SecurityGroup} from "../ec2/securityGroup";
import {Subnet} from "../ec2/subnet";
import {Role} from "../iam/role";
import {Key} from "../kms/key";

export let DotnetCore1d0Runtime: Runtime = "dotnetcore1.0";
export let Java8Runtime: Runtime = "java8";
export let NodeJS4d3EdgeRuntime: Runtime = "nodejs4.3-edge";
export let NodeJS4d3Runtime: Runtime = "nodejs4.3";
export let NodeJS6d10Runtime: Runtime = "nodejs6.10";
export let NodeJSRuntime: Runtime = "nodejs";
export let Python2d7Runtime: Runtime = "python2.7";

export interface DeadLetterConfig {
    target: lumi.Resource;
}

export type Environment = {[key: string]: string};

export class Function extends lumi.NamedResource implements FunctionArgs {
    public code: lumi.asset.Archive;
    public handler: string;
    public role: Role;
    public runtime: Runtime;
    public functionName?: string;
    public deadLetterConfig?: DeadLetterConfig;
    public description?: string;
    public environment?: Environment;
    public kmsKey?: Key;
    public memorySize?: number;
    public timeout?: number;
    public vpcConfig?: VPCConfig;
    public arn: ARN;
    public version: string;
    public codeSHA256: string;
    public lastModified: string;

    constructor(name: string, args: FunctionArgs) {
        super(name);
        if (args.code === undefined) {
            throw new Error("Missing required argument 'code'");
        }
        this.code = args.code;
        if (args.handler === undefined) {
            throw new Error("Missing required argument 'handler'");
        }
        this.handler = args.handler;
        if (args.role === undefined) {
            throw new Error("Missing required argument 'role'");
        }
        this.role = args.role;
        if (args.runtime === undefined) {
            throw new Error("Missing required argument 'runtime'");
        }
        this.runtime = args.runtime;
        this.functionName = args.functionName;
        this.deadLetterConfig = args.deadLetterConfig;
        this.description = args.description;
        this.environment = args.environment;
        this.kmsKey = args.kmsKey;
        this.memorySize = args.memorySize;
        this.timeout = args.timeout;
        this.vpcConfig = args.vpcConfig;
    }
}

export interface FunctionArgs {
    code: lumi.asset.Archive;
    handler: string;
    role: Role;
    runtime: Runtime;
    functionName?: string;
    deadLetterConfig?: DeadLetterConfig;
    description?: string;
    environment?: Environment;
    kmsKey?: Key;
    memorySize?: number;
    timeout?: number;
    vpcConfig?: VPCConfig;
}

export type Runtime =
    "dotnetcore1.0" |
    "java8" |
    "nodejs4.3-edge" |
    "nodejs4.3" |
    "nodejs6.10" |
    "nodejs" |
    "python2.7";

export interface VPCConfig {
    securityGroups: SecurityGroup[];
    subnets: Subnet[];
}


