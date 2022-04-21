// import { DBSchema, openDB } from "idb";

// export interface Cat {
//   id?: number;
//   fact: string;
//   length: number;
// }

// interface MyDB extends DBSchema {
//   cats: {
//     value: Cat;
//     key: number;
//     indexes: { id: number };
//   };
// }

// export const db = openDB<MyDB>("local-database", 1, {
//   upgrade(_db) {
//     const catsStore = _db.createObjectStore("cats", {
//       keyPath: "id",
//       autoIncrement: true,
//     });

//     catsStore.createIndex("id", "id", { unique: true });
//   },
// });

import Dexie, { Table } from "dexie";

export interface Cat {
  id?: number;
  fact: string;
  length: number;
}

export class MySubClassedDexie extends Dexie {
  cats!: Table<Cat>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      cats: "++id, fact, length", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
