class AbstractStopwatch {

    constructor() {
        if (this.constructor == Stopwatch) {
          throw new Error("Abstract classes can't be instantiated.");
        }
      }

    stopwatch(){
        throw new Error("Stopwatch needs to be implemented");
    }

    startStopwatch(){
        throw new Error("startStopwatch needs to be implemented");
    }

    stopStopwatch(){
        throw new Error("stopStopwatch needs to be implemented");
    }

    resetStopwatch(){
        throw new Error("resetStopwatch needs to be implemented");
    }
}

class Stopwatch extends AbstractStopwatch{

}

class ReversedStopwatch extends AbstractStopwatch{
    
}