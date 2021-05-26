#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { AlitestStack } from "../lib/alitest-stack";

const app = new cdk.App();
new AlitestStack(app, "AlitestStack", {});
