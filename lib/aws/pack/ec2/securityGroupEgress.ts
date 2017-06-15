// *** WARNING: this file was generated by the Lumi IDL Compiler (LUMIDL). ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

/* tslint:disable:ordered-imports variable-name */
import * as lumi from "@lumi/lumi";

import {SecurityGroup} from "./securityGroup";

export class SecurityGroupEgress extends lumi.NamedResource implements SecurityGroupEgressArgs {
    public readonly fromPort: number;
    public readonly group: SecurityGroup;
    public readonly ipProtocol: string;
    public readonly toPort: number;
    public readonly cidrIp?: string;
    public readonly cidrIpv6?: string;
    public readonly destinationPrefixListId?: string;
    public readonly destinationSecurityGroup?: SecurityGroup;

    constructor(name: string, args: SecurityGroupEgressArgs) {
        super(name);
        if (args.fromPort === undefined) {
            throw new Error("Missing required argument 'fromPort'");
        }
        this.fromPort = args.fromPort;
        if (args.group === undefined) {
            throw new Error("Missing required argument 'group'");
        }
        this.group = args.group;
        if (args.ipProtocol === undefined) {
            throw new Error("Missing required argument 'ipProtocol'");
        }
        this.ipProtocol = args.ipProtocol;
        if (args.toPort === undefined) {
            throw new Error("Missing required argument 'toPort'");
        }
        this.toPort = args.toPort;
        this.cidrIp = args.cidrIp;
        this.cidrIpv6 = args.cidrIpv6;
        this.destinationPrefixListId = args.destinationPrefixListId;
        this.destinationSecurityGroup = args.destinationSecurityGroup;
    }
}

export interface SecurityGroupEgressArgs {
    readonly fromPort: number;
    readonly group: SecurityGroup;
    readonly ipProtocol: string;
    readonly toPort: number;
    readonly cidrIp?: string;
    readonly cidrIpv6?: string;
    readonly destinationPrefixListId?: string;
    readonly destinationSecurityGroup?: SecurityGroup;
}


