const jsonObjectOrArray = [
  {
    color: 'purple',
    type: 'minivan',
    registration: new Date('2017-01-03'),
    capacity: 7,
  },
  {
    color: 'red',
    type: 'station wagon',
    registration: new Date('2018-03-03'),
    capacity: 5,
  },
]

export default function Page() {
  return <pre>{JSON.stringify(jsonObjectOrArray, null, 2)}</pre>
}
