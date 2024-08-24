'use client'

import CountUp from "react-countup";

function AnimatedCounter({ balance }: { balance: number }) {
  return (
    <div>
      <CountUp
        start={0}
        end={balance}
        duration={2.75}
        decimals={2}
        decimal="."
        prefix="$"
      />
    </div>
  );
}

export default AnimatedCounter;
