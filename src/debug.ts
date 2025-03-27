import { LoggingDebugSession, InitializedEvent } from "@vscode/debugadapter";
import { DebugProtocol } from "@vscode/debugprotocol";

export class DebugSession extends LoggingDebugSession {
  constructor () {
    super();
  }

  /* First request called by the frontend 
   * to interrogate the features the debug adapter provides
   */
  #initializeRequest(response: DebugProtocol.InitializeResponse, args: DebugProtocol.InitializeRequestArguments) {
		response.body = response.body || {};

		// Implements the configurationDoneRequest.
		response.body.supportsConfigurationDoneRequest = true;

		// Supports changing register values.
		response.body.supportsSetVariable = true;

		// Use "evaluate" when hovering over source
		response.body.supportsEvaluateForHovers = true;

		// Show "step back" button
		response.body.supportsStepBack = false;

		// Support data breakpoints
		response.body.supportsDataBreakpoints = true;

		// Support completion in REPL
		response.body.supportsCompletionsRequest = true;
		response.body.completionTriggerCharacters = [ ".", "[" ];

		// Send cancelRequests
		response.body.supportsCancelRequest = true;
    
		// Send the breakpointLocations request
		response.body.supportsBreakpointLocationsRequest = false;

		response.body.supportsRestartRequest = false;
		// Doesn't seem to be supported for now
		// response.body.supportsDisassembleRequest = true;

		this.sendResponse(response);

		// Request configurations like "setBreakpoint" early by sending an "initializeRequest" to the frontend.
		// The frontend will end the configuration sequence by calling 'configurationDone' request.
		this.sendEvent(new InitializedEvent());
  }
}