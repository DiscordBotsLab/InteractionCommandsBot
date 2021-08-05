export default function getMap() {
    return {
        name: 'create',
        description: 'System: Create a new Interaction Command',
        options: [{
            name: 'name',
            description: 'The name of this Interaction Command (1 - 32 chars)',
            type: 'STRING',
            required: true
        }, {
            name: 'description',
            description: 'The description of this Interaction Command (1 - 100 chars)',
            type: 'STRING',
            required: true
        }, {
            name: 'content',
            description: 'The content of this Interaction Command (1 - 2000 chars)',
            type: 'STRING',
            required: true
        }, {
            name: 'ephemeral',
            description: 'Should this Interaction Command be ephemeral (default false)',
            type: 'BOOLEAN'
        }]
    }
}