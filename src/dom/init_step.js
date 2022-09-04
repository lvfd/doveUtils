export default function(progress, configArray) {
  if (!progress) return;
  var value = progress.value? progress.value: 0;
  var addvalue = configArray[0];
  var max = configArray[1]? configArray[1]: progress.max;
  var time = time? time: 1000;
  progress.max = max;
  progress.value = value + addvalue;
}