const dotenv = require("dotenv");
dotenv.config();
const { NodeSDK } = require("@opentelemetry/sdk-node");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const { Resource } = require("@opentelemetry/resources");
const {
  SEMRESATTRS_SERVICE_NAME,
} = require("@opentelemetry/semantic-conventions");
const { ConsoleSpanExporter } = require("@opentelemetry/tracing");

// Create Zipkin and Console exporters
const zipkinExporter = new ZipkinExporter({
  url: process.env.ZIPKIN_TRACES_URL,
});

const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: "my-node-service",
  }),
  traceExporter: new ConsoleSpanExporter(),
  spanProcessor: new SimpleSpanProcessor(zipkinExporter),
  instrumentations: [getNodeAutoInstrumentations()],
});

// Initialize the SDK and start collecting traces
sdk.start();

console.log("Tracing initialized");
