import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm'
import { Note } from './entities/note.entity'

@EventSubscriber()
export class NotesSubscriber implements EntitySubscriberInterface<Note> {

    constructor(dataSource: DataSource)
    {
        dataSource.subscribers.push(this)
    }

    listenTo() {
        return Note
    }

    beforeInsert(event: InsertEvent<Note>) {
        console.log(`BEFORE NOTE INSERTED: `, event.entity)
    }

    afterInsert(event: InsertEvent<Note>) {
        console.log(`AFTER NOTE INSERTED: `, event.entity)
    }
}