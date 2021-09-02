//워커 스레드를 사용하지 않고 소수를 구하는 코드
const min = 2;
const max = 10000000;
const primes = [];

function generatePrimes(start, range){
    let isPrime = true;
    const end = start + range;
    for(let i = start; i < end; i++){
        for(let j = min; j < Math.sqrt(end); j++){
            if(i !== j && i % j === 0){
                isPrime = false;
                break;
            }
        }
        if(isPrime) {
            primes.push(i);
        }
        isPrime = true;
    }
}

console.time('prime');
generatePrimes(min, max);
console.timeEnd('prime');
console.log(primes.length);

//8.258s소요 -> 상당히 긴 시간 소요