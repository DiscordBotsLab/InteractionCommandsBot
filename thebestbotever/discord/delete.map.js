export default function getMap() {
    return {
        name: 'delete',
        description: 'System: Delete an existing Interaction Command',
        options: [{
            name: 'name',
            description: 'The current name of the Interaction Command',
            type: 'STRING',
            required: true
        }]
    }
}