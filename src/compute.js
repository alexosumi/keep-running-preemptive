const { config } = require('dotenv')
config()
const Compute = require('@google-cloud/compute')
const compute = new Compute()
compute_group = process.env["COMPUTE_ENGINE"].split(" ")

module.exports = {
    async compute_check(item) {
        try {
            const vms = await compute.getVMs({ filter: `name eq ${item}` })
            vm_name = vms[0][0].id
            return vm_name
        } catch (err) {
            console.log(`compute engine '${item}' does not exist. (ignored)`)
        }
    },

    async compute_status(item) {
        const vms = await compute.getVMs({ filter: `name eq ${item}` })
        const vm_zone = vms[0][0].zone.name
        const zone = compute.zone(vm_zone)
        const vm = zone.vm(item)

        async function status() {
            const aux = await vm.getMetadata()
            const metadata = aux[0]

            if (metadata.status === 'TERMINATED') {
                console.log(`${metadata.name}: ${metadata.status}`)
                start()
            } else {
                console.log(`${metadata.name}: ${metadata.status}`)
            }
        }

        async function start() {
            await vm.start()
            console.log(`*********Starting ${item}!`)
        }
        
        status()
    }
}