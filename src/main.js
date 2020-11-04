module.exports = {
    async main() {
        const { compute_check } = require('./compute');
        const { compute_status } = require('./compute');

        for (var i = 0; i < compute_group.length; i++) {
            if (await compute_check(compute_group[i]) !== compute_group[i]) {
                delete compute_group[i];
            }
        }
        
        compute_group = compute_group.filter(item => item);
        const compute_array = Array.from(new Set(compute_group));
        console.log(`monitoring compute engines status: ${compute_array}`);

        const interval = setInterval(() => {
            if (compute_array.length != 0) {
                compute_array.forEach(compute_status);
                console.log('-------------------------------------------');
            } else {
                console.log('o array de máquinas está vazio: stopping');
                clearInterval(interval);
            }
        }, process.env['SLEEP_TIME_MS'] || '500000');
    }
}