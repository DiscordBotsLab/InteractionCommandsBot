export default function getMap() {
    return {
        name: 'patch',
        description: 'System: Patch an existing Interaction Command',
        options: [{
            name: 'name',
            description: 'The current name of the Interaction Command',
            type: 'STRING',
            required: true
        }, {
            name: 'new_name',
            description: 'The new name of this Interaction Command (1 - 32 chars)',
            type: 'STRING'
        }, {
            name: 'description',
            description: 'The new description of this Interaction Command (1 - 100 chars)',
            type: 'STRING'
        }, {
            name: 'content',
            description: 'The new content of this Interaction Command (1 - 2000 chars)',
            type: 'STRING'
        }, {
            name: 'ephemeral',
            description: 'Should this Interaction Command be ephemeral',
            type: 'BOOLEAN'
        }]
    }
}