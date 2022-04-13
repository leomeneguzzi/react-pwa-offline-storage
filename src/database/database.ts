import { openDB, DBSchema } from "idb";

export interface Cat {
  id?: number;
  fact: string;
  length: number;
}

interface MyDB extends DBSchema {
  cats: {
    value: Cat;
    key: number;
    indexes: { id: number };
  };
}

export const db = openDB<MyDB>("local-database", 1, {
  upgrade(_db) {
    const catsStore = _db.createObjectStore("cats", {
      keyPath: "id",
      autoIncrement: true,
    });

    catsStore.createIndex("id", "id", { unique: true });
  },
});

// export async function demo() {
//   const db = await openDB<MyDB>('local-database', 1, {
//     upgrade(db) {
//       const catsStore = db.createObjectStore('cats', {
//         keyPath: 'id',
//         autoIncrement: true,
//       });

//       catsStore.createIndex('id', 'id', { unique: true });
//     },
//   });

//   await db.put('cats', {
//     fact: 'I am a cat',
//     length: 10,
//   } as Cat);
//   await db.put('cats', {
//     fact: 'I am a cat two',
//     length: 15,
//   } as Cat);

//   const temp = await db.getFromIndex('cats', 'id', 2);
//   console.log(temp);
// }
