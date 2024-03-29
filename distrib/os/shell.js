/* ------------
   Shell.ts

   The OS Shell - The "command line interface" (CLI) for the console.

    Note: While fun and learning are the primary goals of all enrichment center activities,
          serious injuries may occur when trying to write your own Operating System.
   ------------ */
// TODO: Write a base class / prototype for system services and let Shell inherit from it.
var TSOS;
(function (TSOS) {
    class Shell {
        constructor() {
            // Properties
            this.promptStr = ">";
            this.commandList = [];
            this.curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
            this.apologies = "[sorry]";
        }
        init() {
            var sc;
            //
            // Load the command list.
            // ver
            sc = new TSOS.ShellCommand(this.shellVer, "ver", "- Displays the current version data.");
            this.commandList[this.commandList.length] = sc;
            // help
            sc = new TSOS.ShellCommand(this.shellHelp, "help", "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;
            // shutdown
            sc = new TSOS.ShellCommand(this.shellShutdown, "shutdown", "- Shuts down the virtual OS but leaves the underlying host / hardware simulation running.");
            this.commandList[this.commandList.length] = sc;
            // cls
            sc = new TSOS.ShellCommand(this.shellCls, "cls", "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;
            // man <topic>
            sc = new TSOS.ShellCommand(this.shellMan, "man", "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;
            // trace <on | off>
            sc = new TSOS.ShellCommand(this.shellTrace, "trace", "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;
            // rot13 <string>
            sc = new TSOS.ShellCommand(this.shellRot13, "rot13", "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;
            // prompt <string>
            sc = new TSOS.ShellCommand(this.shellPrompt, "prompt", "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;
            // date
            sc = new TSOS.ShellCommand(this.shellDate, "date", "- Displays the current date and time.");
            this.commandList[this.commandList.length] = sc;
            // whereami
            sc = new TSOS.ShellCommand(this.shellWhereAmI, "whereami", "- Displays the user's current location.");
            this.commandList[this.commandList.length] = sc;
            // whoami
            sc = new TSOS.ShellCommand(this.shellWhoAmI, "whoami", "- Displays the user's current identity.");
            this.commandList[this.commandList.length] = sc;
            // howami
            sc = new TSOS.ShellCommand(this.shellHowAmI, "howami", "- Displays the user's current state and provides details about creation.");
            this.commandList[this.commandList.length] = sc;
            // whyami
            sc = new TSOS.ShellCommand(this.shellWhyAmI, "whyami", "- Displays the user's current purpose.");
            this.commandList[this.commandList.length] = sc;
            // whenami
            sc = new TSOS.ShellCommand(this.shellWhenAmI, "whenami", "- Displays the user's current era.");
            this.commandList[this.commandList.length] = sc;
            // whatami
            sc = new TSOS.ShellCommand(this.shellWhatAmI, "whatami", "- Displays the user's current material construction.");
            this.commandList[this.commandList.length] = sc;
            // status <string>
            sc = new TSOS.ShellCommand(this.shellStatus, "status", "<string> - Updates the current status to <string>.");
            this.commandList[this.commandList.length] = sc;
            // bluescreen
            sc = new TSOS.ShellCommand(this.shellBlueScreen, "bluescreen", "- Causes panic via changing screen color.");
            this.commandList[this.commandList.length] = sc;
            // load
            sc = new TSOS.ShellCommand(this.shellLoad, "load", "- Loads and validates a user program.");
            this.commandList[this.commandList.length] = sc;
            // run <pid>
            sc = new TSOS.ShellCommand(this.shellRun, "run", "<pid> - Runs the program in memory with the specified process ID.");
            this.commandList[this.commandList.length] = sc;
            // clearmem
            sc = new TSOS.ShellCommand(this.shellClearMem, "clearmem", "- Clears all memory partitions once the ready queue is empty.");
            this.commandList[this.commandList.length] = sc;
            // runall
            sc = new TSOS.ShellCommand(this.shellRunAll, "runall", "- Runs all loaded processes.");
            this.commandList[this.commandList.length] = sc;
            // ps
            sc = new TSOS.ShellCommand(this.shellPs, "ps", "- Displays the PID and state of all processes.");
            this.commandList[this.commandList.length] = sc;
            // kill <pid>
            sc = new TSOS.ShellCommand(this.shellKill, "kill", "<pid> - Kills the process with the specified process ID.");
            this.commandList[this.commandList.length] = sc;
            // killall
            sc = new TSOS.ShellCommand(this.shellKillAll, "killall", "- Kill all processes. None survive.");
            this.commandList[this.commandList.length] = sc;
            // quantum <int>
            sc = new TSOS.ShellCommand(this.shellQuantum, "quantum", "<int> - Sets the quantum to the specified positive integer.");
            this.commandList[this.commandList.length] = sc;
            // format
            sc = new TSOS.ShellCommand(this.shellFormat, "format", "- Initialize all blocks in all sectors in all tracks.");
            this.commandList[this.commandList.length] = sc;
            // create <filename>
            sc = new TSOS.ShellCommand(this.shellCreateFilename, "create", "<filename> - Creates the file <filename>.");
            this.commandList[this.commandList.length] = sc;
            // read <filename>
            sc = new TSOS.ShellCommand(this.shellReadFilename, "read", "<filename> - Reads and displays the contents of file <filename>.");
            this.commandList[this.commandList.length] = sc;
            // write <filename> "data"
            sc = new TSOS.ShellCommand(this.shellWriteFilename, "write", "<filename> 'data' - Writes the data inside the quotes to <filename>.");
            this.commandList[this.commandList.length] = sc;
            // delete <filename>
            sc = new TSOS.ShellCommand(this.shellDeleteFilename, "delete", "<filename> - Deletes the file <filename>.");
            this.commandList[this.commandList.length] = sc;
            // copy <existing filename> <new filename>
            sc = new TSOS.ShellCommand(this.shellCopyFilename, "copy", "<existing filename> <new filename> - Creates a copy of <existing filename> with the new name.");
            this.commandList[this.commandList.length] = sc;
            // rename <current filename> <new filename>
            sc = new TSOS.ShellCommand(this.shellRenameFilename, "rename", "<current filename> <new filename> - Renames the file from <current filename> to <new filename>.");
            this.commandList[this.commandList.length] = sc;
            // ls
            sc = new TSOS.ShellCommand(this.shellLs, "ls", "- Lists the files currently stored on the disk.");
            this.commandList[this.commandList.length] = sc;
            // getschedule
            sc = new TSOS.ShellCommand(this.shellGetSchedule, "getschedule", "- Returns the current scheduling algorithm.");
            this.commandList[this.commandList.length] = sc;
            // setschedule
            sc = new TSOS.ShellCommand(this.shellSetSchedule, "setschedule", "- Sets the current scheduling algorithm.");
            this.commandList[this.commandList.length] = sc;
            // Sort the commandList for use in tab completion
            this.commandList = this.commandList.sort((command1, command2) => {
                if (command1.command > command2.command) {
                    return 1;
                }
                else if (command1.command < command2.command) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
            // ps  - list the running processes and their IDs
            // kill <id> - kills the specified process id.
            // Display the initial prompt.
            this.putPrompt();
        }
        putPrompt() {
            _StdOut.putText(this.promptStr);
        }
        handleInput(buffer) {
            _Kernel.krnTrace("Shell Command~" + buffer);
            //
            // Parse the input...
            //
            var userCommand = this.parseInput(buffer);
            // ... and assign the command and args to local variables.
            var cmd = userCommand.command;
            var args = userCommand.args;
            //
            // Determine the command and execute it.
            //
            // TypeScript/JavaScript may not support associative arrays in all browsers so we have to iterate over the
            // command list in attempt to find a match. 
            // TODO: Is there a better way? Probably. Someone work it out and tell me in class.
            var index = 0;
            var found = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                }
                else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args); // Note that args is always supplied, though it might be empty.
            }
            else {
                // It's not found, so check for curses and apologies before declaring the command invalid.
                if (this.curses.indexOf("[" + TSOS.Utils.rot13(cmd) + "]") >= 0) { // Check for curses.
                    this.execute(this.shellCurse);
                }
                else if (this.apologies.indexOf("[" + cmd + "]") >= 0) { // Check for apologies.
                    this.execute(this.shellApology);
                }
                else { // It's just a bad command. {
                    this.execute(this.shellInvalidCommand);
                }
            }
        }
        // Note: args is an optional parameter, ergo the ? which allows TypeScript to understand that.
        execute(fn, args) {
            // We just got a command, so advance the line...
            _StdOut.advanceLine();
            // ... call the command function passing in the args with some über-cool functional programming ...
            fn(args);
            // Check to see if we need to advance the line again
            if (_StdOut.currentXPosition > 0) {
                _StdOut.advanceLine();
            }
            // ... and finally write the prompt again.
            this.putPrompt();
        }
        parseInput(buffer) {
            var retVal = new TSOS.UserCommand();
            // 1. Remove leading and trailing spaces.
            buffer = TSOS.Utils.trim(buffer);
            // 2. Separate on spaces so we can determine the command and command-line args, if any.
            var tempList = buffer.split(" ");
            // 3. Take the first (zeroth) element and use that as the command.
            var cmd = tempList.shift().toLowerCase(); // Yes, you can do that to an array in JavaScript. See the Queue class.
            // 3.1 Remove any left-over spaces.
            cmd = TSOS.Utils.trim(cmd);
            // 3.2 Record it in the return value.
            retVal.command = cmd;
            // 4. If the command is not status or prompt, lower-case the args
            if (cmd != 'status' && cmd != 'prompt') {
                for (let arg in tempList) {
                    tempList[arg] = tempList[arg].toLowerCase();
                }
            }
            // 5. Now create the args array from what's left.
            for (var i in tempList) {
                var arg = TSOS.Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        }
        //
        // Shell Command Functions. Kinda not part of Shell() class exactly, but
        // called from here, so kept here to avoid violating the law of least astonishment.
        //
        shellInvalidCommand() {
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode) {
                _StdOut.putText("Unbelievable. You, [subject name here],");
                _StdOut.advanceLine();
                _StdOut.putText("must be the pride of [subject hometown here].");
            }
            else {
                _StdOut.putText("Type 'help' for, well... help.");
            }
        }
        shellCurse() {
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        }
        shellApology() {
            if (_SarcasticMode) {
                _StdOut.putText("I think we can put our differences behind us.");
                _StdOut.advanceLine();
                _StdOut.putText("For science . . . You monster.");
                _SarcasticMode = false;
            }
            else {
                _StdOut.putText("For what?");
            }
        }
        // Although args is unused in some of these functions, it is always provided in the 
        // actual parameter list when this function is called, so I feel like we need it.
        shellVer(args) {
            _StdOut.putText(APP_NAME + " version " + APP_VERSION);
        }
        shellHelp(args) {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        }
        shellShutdown(args) {
            _StdOut.putText("Shutting down...");
            // Call Kernel shutdown routine.
            _Kernel.krnShutdown();
            // TODO: Stop the final prompt from being displayed. If possible. Not a high priority. (Damn OCD!)
        }
        shellCls(args) {
            _StdOut.clearScreen();
            _StdOut.resetXY();
        }
        shellMan(args) {
            if (args.length > 0) {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        _StdOut.putText("Help displays a list of (hopefully) valid commands.");
                        break;
                    case "ver":
                        _StdOut.putText("Ver displays the current version data.");
                        break;
                    case "shutdown":
                        _StdOut.putText("Shutdown shuts down the virtual OS but leaves the underlying host / " +
                            "hardware simulation running.");
                        break;
                    case "cls":
                        _StdOut.putText("Cls clears the screen and resets the cursor position.");
                        break;
                    case "man":
                        _StdOut.putText("Now, that's an interesting idea...how would a manual define itself? " +
                            "Perhaps recursively?");
                        break;
                    case "trace":
                        _StdOut.putText("Trace turns the OS trace on or off.");
                        break;
                    case "rot13":
                        _StdOut.putText("Imagine a dial with 26 values, each being a letter of the English " +
                            "alphabet in sequence. Rot13 takes your string and replaces each letter " +
                            "with the one 13 places away on said dial.");
                        break;
                    case "prompt":
                        _StdOut.putText("Prompt replaces the shell prompt, which is originally set to '>'.");
                        break;
                    case "date":
                        _StdOut.putText("Date provides the current date and time.");
                        break;
                    case "whereami":
                        _StdOut.putText("Whereami provides the user's current (probable) location.");
                        break;
                    case "whoami":
                        _StdOut.putText("Whoami provides the user's current (probable) identity.");
                        break;
                    case "howami":
                        _StdOut.putText("Howami provides the user's current state and details of his/her origin.");
                        break;
                    case "whyami":
                        _StdOut.putText("Whyami provides the user's current purpose.");
                        break;
                    case "whenami":
                        _StdOut.putText("Whenami provides the user's current era.");
                        break;
                    case "whatami":
                        _StdOut.putText("Whatami provides the user's current chemical composition.");
                        break;
                    case "status":
                        _StdOut.putText("Status updates the current status in the taskbar.");
                        break;
                    case "bluescreen":
                        _StdOut.putText("WARNING: System will require restart after this command. Use sparingly.");
                        break;
                    case "load":
                        _StdOut.putText("Loads a user program and validates the code within.");
                        break;
                    case "run":
                        _StdOut.putText("Runs the program at a specified process ID.");
                        break;
                    case "clearmem":
                        _StdOut.putText("Clears all memory partitions once the ready queue is empty.");
                        break;
                    case "runall":
                        _StdOut.putText("Runs all loaded processes.");
                        break;
                    case "ps":
                        _StdOut.putText("Displays the PID and the state of all processes.");
                        break;
                    case "kill":
                        _StdOut.putText("Kills the program at a specified process ID.");
                        break;
                    case "killall":
                        _StdOut.putText("Kills all programs.");
                        break;
                    case "quantum":
                        _StdOut.putText("Sets the quantum of the CPU scheduler.");
                        break;
                    case "format":
                        _StdOut.putText("Initializes all blocks in all sectors in all tracks.");
                        break;
                    case "create":
                        _StdOut.putText("Creates a file with the specified filename.");
                        break;
                    case "read":
                        _StdOut.putText("Reads and displays the contents of the file specified.");
                        break;
                    case "write":
                        _StdOut.putText("Writes the specified data to the specified filename.");
                        break;
                    case "delete":
                        _StdOut.putText("Deletes the specified filename.");
                        break;
                    case "copy":
                        _StdOut.putText("Makes a copy of the specified file under a different specified name.");
                        break;
                    case "rename":
                        _StdOut.putText("Renames a file to the specified name.");
                        break;
                    case "ls":
                        _StdOut.putText("Lists all files currently stored on the disk.");
                        break;
                    case "getschedule":
                        _StdOut.putText("Returns the current scheduling algorithm.");
                        break;
                    case "setschedule":
                        _StdOut.putText("Sets the current scheduling algorithm.");
                        break;
                    default:
                        _StdOut.putText("No manual entry for " + args[0] + ".");
                }
            }
            else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic.");
            }
        }
        shellTrace(args) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (_Trace && _SarcasticMode) {
                            _StdOut.putText("Trace is already on, doofus.");
                        }
                        else {
                            _Trace = true;
                            _StdOut.putText("Trace ON");
                        }
                        break;
                    case "off":
                        _Trace = false;
                        _StdOut.putText("Trace OFF");
                        break;
                    default:
                        _StdOut.putText("Invalid arguement.  Usage: trace <on | off>.");
                }
            }
            else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        }
        shellRot13(args) {
            if (args.length > 0) {
                // Requires Utils.ts for rot13() function.
                _StdOut.putText(args.join(' ') + " = '" + TSOS.Utils.rot13(args.join(' ')) + "'");
            }
            else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        }
        shellPrompt(args) {
            if (args.length > 0) {
                _OsShell.promptStr = args[0];
            }
            else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        }
        shellDate(args) {
            let currentDate = new Date();
            _StdOut.putText("Current date and time: " + currentDate);
        }
        shellWhereAmI(args) {
            _StdOut.putText("Most likely, United States. Significantly likely, New York. Decent probability, Poughkeepsie.");
        }
        shellWhoAmI(args) {
            _StdOut.putText("Most likely, a conscious mind inside a human. Significantly likely, Marcus or Alan.");
        }
        shellHowAmI(args) {
            _StdOut.putText("User's emotional status: somewhere between disturbed and content.");
            _StdOut.advanceLine();
            _StdOut.putText("For details of the user's origin, please consult https://storks.com/legend-of-storks/");
        }
        shellWhyAmI(args) {
            _StdOut.putText("Your mission: to serve and protect his Royal Majesty by working for the MI6, " +
                "a part of the British Secret Servi-...wait, that can't be right.");
        }
        shellWhenAmI(args) {
            _StdOut.putText("https://letmegooglethat.com/?q=current+era");
            _StdOut.advanceLine();
            _StdOut.putText("Sources suggest the current era is the Holocene era. The link above doesn't. " +
                "But you deserve it for even thinking you might have time traveled.");
        }
        shellWhatAmI(args) {
            _StdOut.putText("99% oxygen, hydrogen, nitrogen, carbon, calcium, and phosphorus. " +
                "0.85% sulfur, potassium, sodium, chlorine, and magnesium. " +
                // TODO: Make the below occur only during Sarcastic mode.
                "Maybe the remaining 0.15% accounts for your humor and intelligence.");
        }
        shellStatus(args) {
            if (args.length > 0) {
                _Status = args.join(" ");
            }
            else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        }
        shellBlueScreen(args) {
            _Kernel.krnTrapError("blue screen test");
        }
        shellLoad(args) {
            // Cast to HTMLInputElement so TypeScript doesn't cry.
            // See https://stackoverflow.com/questions/12989741/the-property-value-does-not-exist-on-value-of-type-htmlelement
            let userProgram = document.getElementById("taProgramInput").value;
            // Validation tests
            if (userProgram.length == 0) {
                _StdOut.putText("Invalid user program - the program is a lie.");
                return;
            }
            // Clean up input by forcing caps and splitting to an array.
            userProgram = userProgram.toUpperCase();
            let program = userProgram.split(' ');
            // Convert each instruction to hex, or return as invalid on a failure.
            for (let i = 0; i < program.length; i++) {
                // Comparison with NaN provided by https://stackoverflow.com/questions/8965364/comparing-nan-values-for-equality-in-javascript
                if (isNaN(parseInt(program[i], 16))) {
                    _StdOut.putText(`Validation error - instruction at index ${i} could not be converted to hex.`);
                    return;
                }
                if (program[i].length > 2) {
                    _StdOut.putText(`Validation error - instruction at index ${i} must be two characters long.`);
                    return;
                }
            }
            _StdOut.putText("User program valid. Please proceed carefully.");
            _StdOut.advanceLine();
            // After successful validation, convert type to number.
            let programInHex = [];
            for (let index in program) {
                programInHex[index] = parseInt(program[index], 16);
            }
            // What needs to happen here?
            // System needs memory allocated by MMU - set base for logical to physical address conversion
            // If priority was passed, pass it along to the MMU.
            if (args.length > 0 && parseInt(args[0]) >= 0) {
                _MemoryManager.allocateMemory(programInHex, parseInt(args[0]));
            }
            else {
                _MemoryManager.allocateMemory(programInHex);
            }
            // System must write to memory starting at logical 0x0000 up until, but not exceeding, logical 0x0100.
            // System should create the PCB and return the process ID of the program.
        }
        shellRun(args) {
            // Get process at id of first arg
            try {
                let processId = parseInt(args[0]);
                let process = _MemoryManager.registeredProcesses[processId];
                // Validate if process has been executed or is currently executing
                if (process.state != 'RESIDENT') {
                    throw new Error(`Process with ID ${args[0]} is not available for additional execution.`);
                }
                // Enqueue the process to the CpuScheduler's ready queue
                _CPUScheduler.enqueue(process);
                // When finished, CPU halt op code will call for memory de-allocation.
            }
            catch (e) {
                _Kernel.krnTrace(e);
                _StdOut.putText(`ERR: Check console for details.`);
            }
        }
        shellClearMem(args) {
            if (!_CPU.isExecuting) {
                for (let process of _MemoryManager.registeredProcesses) {
                    if (process.state !== 'TERMINATED' && process.location === 'RAM') {
                        _MemoryManager.deallocateMemory(process);
                    }
                }
            }
            else {
                _StdOut.putText('ERR: Process currently running - use command killall to halt running processes.');
            }
        }
        shellRunAll(args) {
            for (let process of _MemoryManager.registeredProcesses) {
                if (process.state === 'RESIDENT') {
                    _CPUScheduler.enqueue(process);
                }
            }
        }
        shellPs(args) {
            for (let process of _MemoryManager.registeredProcesses) {
                _StdOut.putText(`Process ID: ${process.processId}, State: ${process.state}`);
                _StdOut.advanceLine();
            }
        }
        shellKill(args) {
            // Get process at id of first arg
            try {
                let processId = parseInt(args[0]);
                let process = _MemoryManager.registeredProcesses[processId];
                // End all life forms of the process
                if (process.state === 'RUNNING') {
                    _Kernel.krnHaltProgramSilent(process);
                }
                else if (process.state === 'READY') {
                    _CPUScheduler.extractProcess(process);
                    _MemoryManager.deallocateMemory(process);
                }
                // When finished, CPU halt op code will call for memory de-allocation.
            }
            catch (e) {
                _Kernel.krnTrace(e);
                _StdOut.putText(`ERR: Check console for details.`);
            }
        }
        shellKillAll(args) {
            // Stop running CPU
            _Kernel.krnHaltProgramSilent(_CPU.currentProcess);
            // Clear ready queue
            _CPUScheduler.clearQueue();
            // Deallocate memory
            for (let process of _MemoryManager.registeredProcesses) {
                if (process.state !== 'TERMINATED') {
                    _MemoryManager.deallocateMemory(process);
                }
            }
        }
        shellQuantum(args) {
            // Verify input
            let target = parseInt(args[0]);
            if (target < 1) {
                _StdOut.putText(`${args[0]} is not recognized as a positive integer. Please try again.`);
                return;
            }
            // Update quantum
            _CPUScheduler.quantum = target;
        }
        shellFormat(args) {
            if (args.length > 0 && args[0] === '-quick') {
                _krnDiskSystemDriver.formatQuick();
            }
            else {
                _krnDiskSystemDriver.format();
            }
        }
        shellCreateFilename(args) {
            if (args.length > 0) {
                try {
                    _krnDiskSystemDriver.create(args[0]);
                    _StdOut.putText(`File ${args[0]} created.`);
                }
                catch (error) {
                    _StdOut.putText(error.message);
                }
            }
            else {
                _StdOut.putText("Usage: prompt <filename>  Please supply a string.");
            }
        }
        shellReadFilename(args) {
            if (args.length > 0) {
                try {
                    _StdOut.putText(_krnDiskSystemDriver.read(args[0]));
                }
                catch (error) {
                    _StdOut.putText(error.message);
                }
            }
            else {
                _StdOut.putText("Usage: prompt <filename>  Please supply a string.");
            }
        }
        shellWriteFilename(args) {
            if (args.length > 1) {
                try {
                    let filename = args.shift();
                    let data = args.join(' ');
                    if (data.startsWith('"') && data.endsWith('"')) {
                        data = data.substring(1, data.length - 1);
                        _krnDiskSystemDriver.write(filename, data);
                        _StdOut.putText(`File ${filename} updated.`);
                    }
                    else {
                        throw new Error('ERR: Data to be written must be enclosed within double quotations.');
                    }
                }
                catch (error) {
                    _StdOut.putText(error.message);
                }
            }
            else {
                _StdOut.putText("Usage: prompt <filename>  Please supply a string.");
            }
        }
        shellDeleteFilename(args) {
            if (args.length > 0) {
                try {
                    _krnDiskSystemDriver.delete(args[0]);
                    _StdOut.putText(`File ${args[0]} deleted.`);
                }
                catch (error) {
                    _StdOut.putText(error.message);
                }
            }
            else {
                _StdOut.putText("Usage: prompt <filename>  Please supply a string.");
            }
        }
        shellCopyFilename(args) {
            if (args.length > 1) {
                try {
                    let existingFilename = args[0];
                    let newFilename = args[1];
                    _krnDiskSystemDriver.copy(existingFilename, newFilename);
                    _StdOut.putText(`Created copy of ${existingFilename} as ${newFilename}.`);
                }
                catch (error) {
                    _StdOut.putText(error.message);
                }
            }
            else {
                _StdOut.putText("Usage: prompt <filename>  Please supply a string.");
            }
        }
        shellRenameFilename(args) {
            if (args.length > 1) {
                try {
                    let previousFilename = args[0];
                    let newFilename = args[1];
                    _krnDiskSystemDriver.rename(previousFilename, newFilename);
                    _StdOut.putText(`Renamed ${previousFilename} as ${newFilename}.`);
                }
                catch (error) {
                    _StdOut.putText(error.message);
                }
            }
            else {
                _StdOut.putText("Usage: prompt <filename>  Please supply a string.");
            }
        }
        shellLs(args) {
            try {
                let filenames = _krnDiskSystemDriver.ls();
                // Check for -a command
                if (args.length > 0 && args[0] === '-a') {
                    // If -a, list all files.
                    for (let i = 0; i < filenames.length; i++) {
                        _StdOut.putText(filenames[i]);
                        // Break the line if there are more filenames to print.
                        if (i < filenames.length - 1) {
                            _StdOut.advanceLine();
                        }
                    }
                }
                else {
                    // Print each non-hidden filename to console.
                    for (let i = 0; i < filenames.length; i++) {
                        if (filenames[i].startsWith('.')) {
                            continue;
                        }
                        _StdOut.putText(filenames[i]);
                        // Break the line if there are more filenames to print.
                        if (i < filenames.length - 1) {
                            _StdOut.advanceLine();
                        }
                    }
                }
            }
            catch (error) {
                _StdOut.putText(error.message);
            }
        }
        shellGetSchedule(args) {
            _StdOut.putText(_CPUScheduler.getSchedule());
        }
        shellSetSchedule(args) {
            if (args.length > 0) {
                switch (args[0].toUpperCase()) {
                    case 'ROUND ROBIN':
                    case 'FCFS':
                    case 'PRIORITY':
                        _CPUScheduler.setSchedule(args[0].toUpperCase());
                        _StdOut.putText(`Schedule set: ${args[0].toUpperCase()}`);
                        break;
                    default:
                        _StdOut.putText(`ERR: ${args[0]} not recognized as a compatible scheduling algorithm.`);
                }
            }
        }
    }
    TSOS.Shell = Shell;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=shell.js.map