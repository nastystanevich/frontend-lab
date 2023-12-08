import React, {useEffect, useState} from "react";

const getDate = () => {
    let currentDate = new Date();

    return `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
}


const CurrentTime = () => {
    const [time, setTime] = useState(getDate());

    useEffect(() => {
        setInterval(() => setTime(getDate()),1000);
    },[])

    return <p>{time}</p>;
}

export default CurrentTime;