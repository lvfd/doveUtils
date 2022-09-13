const color = {
  blue: 'rgb(3, 78, 162)',
  yellow: 'rgb(250, 166, 26)',
}
const legendLabel = '图例'

const type = 'bar'
const options = {
  layout: {
    padding: 20
  }
}

function getLabels() {
  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ]
}

function getData() {
  return [0, 10, 5, 2, 20, 30, 45]
}

const data = {
  labels: getLabels(),
  datasets: [{
    data: getData(),
    label: legendLabel,
    backgroundColor: color.blue,
    borderColor: color.blue,
  }]
}

const config = {
  type: type,
  data: data,
  options: options
}

export default config