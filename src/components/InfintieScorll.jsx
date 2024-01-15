import React, { useEffect, useState ,useRef} from 'react'

const InfintieScorll = (props) => {

  const {query,getData} = props;
  const pageNumber = useRef(1)
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    getData(query,pageNumber.current)
    setLoading(false)
},[getData, query])

  return (
    <h1>hi</h1>
  )
}

export default InfintieScorll