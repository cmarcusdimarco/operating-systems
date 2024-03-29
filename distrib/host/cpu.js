/* ------------
     CPU.ts

     Routines for the host CPU simulation, NOT for the OS itself.
     In this manner, it's A LITTLE BIT like a hypervisor,
     in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
     that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
     TypeScript/JavaScript in both the host and client environments.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */
var TSOS;
(function (TSOS) {
    class Cpu extends TSOS.Hardware {
        /**
         *      OpCode  |   Operands    |   Description
         *      -----------------------------------------------------------------------------------------
         *      00      |   0           |   Break / halt
         *      6D      |   2           |   Add with carry - result into accumulator
         *      8A      |   0           |   Load the accumulator from the X register
         *      8D      |   2           |   Store the accumulator in memory
         *      98      |   0           |   Load the accumulator from the Y register
         *      A0      |   1           |   Load the Y register with a constant
         *      A2      |   1           |   Load the X register with a constant
         *      A8      |   0           |   Load the Y register from the accumulator
         *      A9      |   1           |   Load the accumulator with a constant
         *      AA      |   0           |   Load the X register from the accumulator
         *      AC      |   2           |   Load the Y register from memory
         *      AD      |   2           |   Load the accumulator from memory
         *      AE      |   2           |   Load the X register from memory
         *      D0      |   1           |   Branch n bytes if Z flag = 0
         *      EA      |   0           |   No operation
         *      EC      |   2           |   Compare a byte in memory to X register, set Z flag if equal
         *      EE      |   2           |   Increment the value of a byte
         *      FF      |   0 or 2      |   If 1 in X register, print the integer in the Y register
         *                                  If 2 in X register, print 0x00-terminated string starting at
         *                                      address in Y register
         *                                  If 3 in X register, print 0x00-terminated string starting at
         *                                      address in operand
         */
        constructor() {
            super('CPU', 0);
            this.currentStep = 0x0; // Placeholder to identify current step of instruction cycle
            // Registers
            this.accumulator = 0x00;
            this.instructionRegister = 0x00; // Register to hold current instruction
            this.programCounter = 0x0000; // Register to hold program counter
            this.xRegister = 0x00;
            this.yRegister = 0x00;
            this.carryFlag = 0x0;
            this.zFlag = 0x0;
            this.isExecuting = false; // Shows OS if CPU has program left to execute
            // OS GUI Objects
            this.docAccumulator = document.getElementById(`cpuAccumulator`);
            this.docInstructionRegister = document.getElementById(`cpuInstructionRegister`);
            this.docProgramCounter = document.getElementById(`cpuProgramCounter`);
            this.docXRegister = document.getElementById(`cpuXRegister`);
            this.docYRegister = document.getElementById(`cpuYRegister`);
            this.docZFlag = document.getElementById(`cpuZFlag`);
            // Multi-dimensional array representing instruction set. First dimension stores op codes.
            // Second dimension stores number of operands to expect after op code or stores 0xFF if the number of
            // operands is conditional.
            this.instructionSet = [
                [0x00, 0x6D, 0x8A, 0x8D, 0x98, 0xA0, 0xA2, 0xA8, 0xA9, 0xAA, 0xAC, 0xAD, 0xAE, 0xD0, 0xEA, 0xEC, 0xEE, 0xFF],
                [0x00, 0x02, 0x00, 0x02, 0x00, 0x01, 0x01, 0x00, 0x01, 0x00, 0x02, 0x02, 0x02, 0x01, 0x00, 0x02, 0x02, 0xFF]
            ];
            this.cpuClockCount = 0;
        }
        // Initialize CPU for running a resident program.
        init() {
            this.accumulator = 0x00;
            this.instructionRegister = 0x00;
            this.programCounter = 0x0000;
            this.xRegister = 0x00;
            this.yRegister = 0x00;
            this.carryFlag = 0x0;
            this.zFlag = 0x0;
            this.currentStep = 0x00;
            // Update OS GUI fields.
            this.docAccumulator.textContent = '00';
            this.docInstructionRegister.textContent = '00';
            this.docProgramCounter.textContent = '0000';
            this.docXRegister.textContent = '00';
            this.docYRegister.textContent = '00';
            this.docZFlag.textContent = '0';
        }
        // Initialize CPU by passing a PCB
        initWithPCB(pcb) {
            this.accumulator = parseInt(pcb.accumulator, 16);
            this.instructionRegister = parseInt(pcb.instructionRegister, 16);
            this.programCounter = parseInt(pcb.programCounter, 16);
            this.xRegister = parseInt(pcb.xRegister, 16);
            this.yRegister = parseInt(pcb.yRegister, 16);
            this.carryFlag = 0x0;
            this.zFlag = parseInt(pcb.zFlag, 16);
            this.currentProcess = pcb;
            this.currentStep = 0x00;
            // Update OS GUI fields.
            this.docAccumulator.textContent = this.hexLog(this.accumulator, 2);
            this.docInstructionRegister.textContent = this.hexLog(this.instructionRegister, 2);
            this.docProgramCounter.textContent = this.hexLog(this.programCounter, 4);
            this.docXRegister.textContent = this.hexLog(this.xRegister, 2);
            this.docYRegister.textContent = this.hexLog(this.yRegister, 2);
            this.docZFlag.textContent = this.hexLog(this.zFlag, 1);
        }
        pulse() {
            this.cpuClockCount++;
            this.log(`received clock pulse - CPU Clock Count: ${this.cpuClockCount}`);
            this.log(`CPU State | Mode: 0 PC: ${this.hexLog(this.programCounter, 4)} ` +
                `IR: ${this.hexLog(this.instructionRegister, 2)} ` +
                `Acc: ${this.hexLog(this.accumulator, 2)} ` +
                `xReg: ${this.hexLog(this.xRegister, 2)} ` +
                `yReg: ${this.hexLog(this.yRegister, 2)} ` +
                `zFlag: ${this.hexLog(this.zFlag, 1)} ` +
                `Step: ${this.hexLog(this.currentStep, 1)}`);
            // At the hardware level, each case below will require at least one clock cycle to complete.
            // However, for the purposes of our OS creation, we are abstracting the full fetch/decode/execute
            // cycle to complete in a single clock cycle. In order to best emulate the hardware, remove the
            // encapsulating do/while loop.
            do {
                switch (this.currentStep) {
                    case 0x0:
                        this.fetch();
                        break;
                    case 0x1:
                        this.decode();
                        break;
                    case 0x2:
                        this.decode2();
                        break;
                    case 0x3:
                        this.execute();
                        break;
                    case 0x4:
                        this.execute2();
                        break;
                    case 0x5:
                        this.writeBack();
                        break;
                    case 0x6:
                        this.interruptCheck();
                        break;
                    default:
                        break;
                }
            } while (this.currentStep !== 0x00);
            // Update PCB in GUI.
            this.updatePCB();
        }
        // Pipelining outline
        fetch() {
            // Get the next instruction from the memory address in the program counter
            this.instructionRegister = _MemoryAccessor.readImmediate(this.programCounter + this.currentProcess.startingAddress);
            // End by incrementing program counter and step counter
            this.programCounter++;
            this.currentStep++;
            // Update OS GUI
            this.docInstructionRegister.textContent = this.hexLog(this.instructionRegister, 2);
            this.docProgramCounter.textContent = this.hexLog(this.programCounter, 4);
            this.currentProcess.highlightCurrentInstructionInMemory();
        }
        decode() {
            // Interpret the instruction and determine if more operands are necessary for execution
            let numOperands;
            let instructionExists = false;
            // Find instructionIndex and numOperands for the current instruction
            for (let i = 0x00; i < this.instructionSet[0x00].length; i++) {
                if (this.instructionSet[0x00][i] === this.instructionRegister) {
                    numOperands = this.instructionSet[0x01][i];
                    instructionExists = true;
                    break;
                }
            }
            // Use guard clause to halt program if instruction is invalid
            if (!instructionExists) {
                _StdOut.putText(`ERR: ${this.hexLog(this.instructionRegister, 2)} is not a valid instruction. Halting program...`);
                this.haltProgram();
                return;
            }
            // For conditional opcodes, check X register to determine numOperands
            if (numOperands === 0xFF) {
                if (this.xRegister === 0x03) {
                    numOperands = 0x02;
                }
                else {
                    numOperands = 0x00;
                }
            }
            // If no operands, jump to execute.
            // If one operand, store operand where needed and skip decode2.
            // If two operands, store low order byte.
            switch (numOperands) {
                case 0x00:
                    this.currentStep += 2;
                    return;
                case 0x01:
                    switch (this.instructionRegister) {
                        // Loading constant cases, skip to interrupt check
                        case 0xA0:
                            this.yRegister = _MemoryAccessor.readImmediate(this.programCounter + this.currentProcess.startingAddress);
                            this.currentStep = 6;
                            // Update OS GUI
                            this.docYRegister.textContent = this.hexLog(this.yRegister, 2);
                            break;
                        case 0xA2:
                            this.xRegister = _MemoryAccessor.readImmediate(this.programCounter + this.currentProcess.startingAddress);
                            this.currentStep = 6;
                            // Update OS GUI
                            this.docXRegister.textContent = this.hexLog(this.xRegister, 2);
                            break;
                        case 0xA9:
                            this.accumulator = _MemoryAccessor.readImmediate(this.programCounter + this.currentProcess.startingAddress);
                            this.currentStep = 6;
                            // Update OS GUI
                            this.docAccumulator.textContent = this.hexLog(this.accumulator, 2);
                            break;
                        // Branch to relative address
                        case 0xD0:
                            _MemoryAccessor.setLowOrder(_MemoryAccessor.readImmediate(this.programCounter + this.currentProcess.startingAddress));
                            this.currentStep += 2;
                            break;
                        default:
                            this.log(`ERR: ${this.instructionRegister} is not a valid instruction.`);
                            break;
                    }
                    this.programCounter++;
                    // Update OS GUI
                    this.docProgramCounter.textContent = this.hexLog(this.programCounter, 4);
                    return;
                case 0x02:
                    _MemoryAccessor.setLowOrder(_MemoryAccessor.readImmediate(this.programCounter + this.currentProcess.startingAddress));
                    this.programCounter++;
                    this.currentStep++;
                    // Update OS GUI
                    this.docProgramCounter.textContent = this.hexLog(this.programCounter, 4);
                    return;
                default:
                    return;
            }
        }
        decode2() {
            // If reached, load high order byte
            _MemoryAccessor.setHighOrder(_MemoryAccessor.readImmediate(this.programCounter + this.currentProcess.startingAddress) + (this.currentProcess.startingAddress / 0x100));
            this.programCounter++;
            this.currentStep++;
            // Update OS GUI
            this.docProgramCounter.textContent = this.hexLog(this.programCounter, 4);
        }
        execute() {
            // Perform the action specified by the instruction
            switch (this.instructionRegister) {
                case 0x00: // Halt
                    this.haltProgram();
                    return;
                case 0x6D: // Add with carry
                    this.accumulator += _MemoryAccessor.read();
                    if (this.accumulator > 0xFF) {
                        this.accumulator -= 0x100;
                        this.carryFlag = 1;
                    }
                    // Update OS GUI
                    this.docAccumulator.textContent = this.hexLog(this.accumulator, 2);
                    break;
                case 0x8A: // Load accumulator from X register
                    this.accumulator = this.xRegister;
                    // Update OS GUI
                    this.docAccumulator.textContent = this.hexLog(this.accumulator, 2);
                    break;
                case 0x8D: // Store accumulator in memory
                    _MemoryAccessor.write(this.accumulator);
                    break;
                case 0x98: // Load accumulator from Y register
                    this.accumulator = this.yRegister;
                    // Update OS GUI
                    this.docAccumulator.textContent = this.hexLog(this.accumulator, 2);
                    break;
                case 0xA8: // Load Y register from accumulator
                    this.yRegister = this.accumulator;
                    // Update OS GUI
                    this.docYRegister.textContent = this.hexLog(this.yRegister, 2);
                    break;
                case 0xAA: // Load X register from accumulator
                    this.xRegister = this.accumulator;
                    // Update OS GUI
                    this.docXRegister.textContent = this.hexLog(this.xRegister, 2);
                    break;
                case 0xAC: // Load Y register from memory
                    this.yRegister = _MemoryAccessor.read();
                    // Update OS GUI
                    this.docYRegister.textContent = this.hexLog(this.yRegister, 2);
                    break;
                case 0xAD: // Load accumulator from memory
                    this.accumulator = _MemoryAccessor.read();
                    // Update OS GUI
                    this.docAccumulator.textContent = this.hexLog(this.accumulator, 2);
                    break;
                case 0xAE: // Load X register from memory
                    this.xRegister = _MemoryAccessor.read();
                    // Update OS GUI
                    this.docXRegister.textContent = this.hexLog(this.xRegister, 2);
                    break;
                case 0xD0: // Branch n bytes if Z flag not set
                    if (this.zFlag === 0) {
                        if (_MemoryAccessor.getLowOrderByte() <= 0x7F) {
                            this.programCounter += _MemoryAccessor.getLowOrderByte();
                        }
                        else {
                            this.programCounter -= (256 - _MemoryAccessor.getLowOrderByte());
                        }
                        // Update OS GUI
                        this.docProgramCounter.textContent = this.hexLog(this.programCounter, 4);
                    }
                    break;
                case 0xEA: // No operation
                    break;
                case 0xEC: // Compare memory to X register, set Z flag if equal
                    if (this.xRegister === _MemoryAccessor.read()) {
                        this.zFlag = 1;
                    }
                    else {
                        this.zFlag = 0;
                    }
                    // Update OS GUI
                    this.docZFlag.textContent = this.hexLog(this.zFlag, 1);
                    break;
                case 0xEE: // Increment value of a byte
                    this.accumulator = _MemoryAccessor.read();
                    this.currentStep -= 2; // Relative decrement to reach execute2()
                    // Update OS GUI
                    this.docAccumulator.textContent = this.hexLog(this.accumulator, 2);
                    break;
                case 0xFF: // System call
                    switch (this.xRegister) {
                        case 0x1:
                            // Print integer in Y register
                            _StdOut.putText(this.yRegister.toString());
                            break;
                        case 0x2:
                            // Print 0x00 terminating string starting from address in Y register
                            let currentAddress = this.yRegister;
                            while (_MemoryAccessor.readImmediate(currentAddress + this.currentProcess.startingAddress) !== 0x00) {
                                let toPrint = TSOS.Ascii.lookup(_MemoryAccessor.readImmediate(currentAddress + this.currentProcess.startingAddress));
                                _StdOut.putText(toPrint);
                                currentAddress++;
                            }
                            break;
                        case 0x3:
                            // Print 0x00 terminating string starting from address in MMU
                            let lowString = _MemoryAccessor.getLowOrderByte().toString(16);
                            let highString = _MemoryAccessor.getHighOrderByte().toString(16);
                            let fullString = "0x".concat(highString.concat(lowString));
                            let desiredAddress = Number(fullString);
                            while (_MemoryAccessor.readImmediate(desiredAddress + this.currentProcess.startingAddress) !== 0x00) {
                                let toPrint = TSOS.Ascii.lookup(_MemoryAccessor.readImmediate(desiredAddress + this.currentProcess.startingAddress));
                                _StdOut.putText(toPrint);
                                desiredAddress++;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
            this.currentStep += 3;
        }
        execute2() {
            // Perform second execute phase if needed
            // Currently only exists for EE
            if (this.accumulator === 0xFF) {
                // Halt if current instruction would violate bounds
                this.log('Bounds violation - attempted to increment accumulator beyond 0xFF. Halting program...');
                // Tell the user
                _StdOut.putText('ERR: Bounds violation - attempted to increment accumulator beyond 0xFF. Halting program...');
                this.haltProgram();
                this.currentStep = 0x00;
                return;
            }
            this.accumulator++;
            this.currentStep++;
            // Update OS GUI
            this.docAccumulator.textContent = this.hexLog(this.accumulator, 2);
        }
        writeBack() {
            // An operation which requires updating a value will need to call writeBack
            // in order to write the new value back to the memory address
            // Currently only exists for EE
            _MemoryAccessor.write(this.accumulator);
            this.currentStep++;
        }
        interruptCheck() {
            // Check for hardware interrupts - if present, put program and register data on stack and execute
            // interrupt. This is commented out as in our OS, we will be bypassing hardware interrupts and
            // handling interrupts exclusively through software.
            // this.IC.emptyNextInterruptQueues();
            this.currentStep = 0;
        }
        updatePCB() {
            // Update the PCB of the currently executing process to reflect changes in the CPU state.
            this.currentProcess.update(this);
            this.currentProcess.updateGUI(this.currentProcess.state);
        }
        // Returns the current state of the CPU. For use in creating Process Control Blocks.
        getCpuState() {
            return {
                accumulator: this.hexLog(this.accumulator, 2),
                instructionRegister: this.hexLog(this.instructionRegister, 2),
                programCounter: this.hexLog(this.programCounter, 4),
                xRegister: this.hexLog(this.xRegister, 2),
                yRegister: this.hexLog(this.yRegister, 2),
                zFlag: this.hexLog(this.zFlag, 1)
            };
        }
        getCurrentProcess() {
            return this.currentProcess;
        }
        // Encapsulating halt function to improve readability across multiple calls
        haltProgram() {
            this.isExecuting = false;
            // TODO: Put the following statements where they belong. Hardware should not trigger OS level calls.
            _MemoryManager.deallocateMemory(this.currentProcess);
            _StdOut.advanceLine();
            _OsShell.putPrompt();
            _Kernel.singleStep = false;
            document.getElementById("btnStep").disabled = true;
            // Reset CPU state
            this.init();
        }
    }
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
//# sourceMappingURL=cpu.js.map