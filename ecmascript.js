const callbacks = []
const number = callbacks.toString()
for (let i = 0; i <= 2; i++) {
    callbacks[i] = function() {
        return i * 2
    }
}
console.log(number)