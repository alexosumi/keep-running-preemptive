const dotenv = require('dotenv');
dotenv.config();
const sleep = require('sleep-promise');
const Collect = require('@supercharge/collections')
const Compute = require('@google-cloud/compute');
const compute = new Compute();
var compute_group = process.env["COMPUTE_ENGINE"].split(' ')

async function main(){

    async function compute_check(item) {
        try {
        const  vms = await compute.getVMs({filter: `name eq ${item}`})
        const vm_name = vms[0][0].id
        return vm_name
        } catch (err) {
            console.log(`compute engine '${item}' does not exist. (ignored)`)
        }
    }

    for (var i = 0; i < compute_group.length; i++) {
        if (await compute_check(compute_group[i]) != compute_group[i] ) {
        delete compute_group[i] 
        }
    }
    
    compute_group = compute_group.filter(item => item)
    const compute_array = Collect(compute_group).unique().all()
    console.log(`monitoring compute engines status: ${compute_array}`)
    while(true){

        compute_array.forEach(compute_status)
        console.log('-------------------------------------------')
        async function compute_status(item) {

        const vms = await compute.getVMs({filter: `name eq ${item}`});
            const vm_zone = vms[0][0].zone.name
            const zone = compute.zone(vm_zone);
            const vm = zone.vm(item);
    
        async function status() {
            var aux = await vm.getMetadata()
            var metadata=aux[0]   
        
            if (metadata.status == 'TERMINATED') {
                console.log(`${metadata.name}: ${metadata.status}`)
                start()
            } else {
                console.log(`${metadata.name}: ${metadata.status}`)
            }
        }

        async function start() {
            var data = await vm.start();
            const operation = data[0];
            const apiResponse = data[1];
        }
        status()
    }

        await sleep(process.env["SLEEP_TIME_MS"])
    }
}

main()