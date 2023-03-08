// This is "processor.js" file, evaluated in AudioWorkletGlobalScope upon
// audioWorklet.addModule() call in the main global scope.
class MyWorkletProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputs, outputs, parameters) {
    // audio processing code here.
    var greenCount = 0;
    var volume = 0;
    var averaging = 0.7;
    console.log("--- input buffer ")
    console.log(JSON.stringify(inputs));
      var buf = inputs[0];
      var bufLength = buf.length;
      var sum = 0;
      var x;
  
      // Do a root-mean-square on the samples: sum up the squares...
      for (var i = 0; i < bufLength; i++) {
        x = buf[i];
        sum += x * x;
      }
  
      // ... then take the square root of the sum.
      var rms = Math.sqrt(sum / bufLength);
  
      // Now smooth this out with the averaging factor applied
      // to the previous sample - take the max here because we
      // want "fast attack, slow release."
      volume = Math.max(rms, volume * averaging);
  
      //...meterWidth = (cnvs.width - 20) * volume * 4;
      
      return true;
  }
}

registerProcessor('my-worklet-processor', MyWorkletProcessor);