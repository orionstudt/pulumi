// *** WARNING: this file was generated by the Lumi IDL Compiler (LUMIDL). ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

/* tslint:disable:ordered-imports variable-name */
import * as lumi from "@lumi/lumi";

import {VPC} from "./vpc";

export class Subnet extends lumi.NamedResource implements SubnetArgs {
    public readonly cidrBlock: string;
    public readonly vpc: VPC;
    public readonly availabilityZone?: string;
    public mapPublicIpOnLaunch?: boolean;

    constructor(name: string, args: SubnetArgs) {
        super(name);
        if (args.cidrBlock === undefined) {
            throw new Error("Missing required argument 'cidrBlock'");
        }
        this.cidrBlock = args.cidrBlock;
        if (args.vpc === undefined) {
            throw new Error("Missing required argument 'vpc'");
        }
        this.vpc = args.vpc;
        this.availabilityZone = args.availabilityZone;
        this.mapPublicIpOnLaunch = args.mapPublicIpOnLaunch;
    }
}

export interface SubnetArgs {
    readonly cidrBlock: string;
    readonly vpc: VPC;
    readonly availabilityZone?: string;
    mapPublicIpOnLaunch?: boolean;
}


