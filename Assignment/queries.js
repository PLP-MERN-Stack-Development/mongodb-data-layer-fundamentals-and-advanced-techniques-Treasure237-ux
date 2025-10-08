const { MongoClient } = require('mongodb')
const URI = 'mongodb://localhost:27017'

const dbName = "plp_bookstore"
const collectionName = "books"

async function main(){
    const client = new MongoClient(URI);

    try{
        //connecting to localhost
        await client.connect();
        console.log("\nDatabase connected successfully\n");

        // connection to db and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        console.log(`\nconnected to the ${collectionName} collection in the ${dbName}\n`)

       // first query: Find all books in a specific genre
        const fnd = await collection.find({genre:'Fiction'}).toArray();
        console.log('\nAll BOOKS IN THE GENRE: FICTION: ', fnd ,'\n'); 

        // second query: Find books published after a certain year
        const fnd2 = await collection.find({published_year: { $gt: 1851 }}).toArray();
        console.log('\nALL BOOKS PUBLISHED ABOVE 1851 : ', fnd2 ,'\n');

        // third query: Find books by a specific author
        const fnd3 = await collection.find({author: 'Paulo Coelho'}).toArray();
        console.log('\nBook by Paulo Coelho: ', fnd3 ,'\n');

        // fourth query: Update the price of a specific book
        await collection.updateOne({title: 'Moby Dick'}, {$set: { price : 12.98 }});
        console.log('\npriced updated: ');

        // fifth query: Delete a book by its title
        await collection.deleteOne({title: 'Wuthering Heights'});
        console.log('\nWuthering Heights has been deleted');

        //                task3: advanced queries
        //Write a query to find books that are both in stock and published after 2010
        const fnd4 = await collection.find({in_stock: true , published_year: {$gt:2010} }).toArray();
        console.log('\nIN STOCK AND PUBLISHED ABOVE 2010: ', fnd4);

        //Use projection to return only the title, author, and price fields in your queries
        const fnd5 = await collection.find({}, {title:1, author:1, price:1, _id:0}).toArray();
        console.log('DOCUMENTS: ', fnd5);

        //Implement sorting to display books by price (both ascending and descending)
        const fnd6 = await collection.find().sort({price:1}).toArray();
        console.log('\nBOOKS SORTED BY PRICE IN ASCENDING ORDER: ', fnd6);
        const fnd7 = await collection.find().sort({price:-1}).toArray();
        console.log('\nBOOKS SORTED BY PRICE IN DESCENDING ORDER: ', fnd7);

        //Use the limit and skip methods to implement pagination (5 books per page)
        const page = 1; // Change this value to get different pages
        const limit = 5;
        const skip = (page - 1) * limit;
        const fnd8 = await collection.find().skip(skip).limit(limit).toArray();
        console.log(`\nBOOKS ON PAGE ${page}: `, fnd8);

        //Task 4: Aggregation Pipeline
        //Create an aggregation pipeline to calculate the average price of books by genre
        const agg1 = await collection.aggregate([
            { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
        ]).toArray();
        console.log('\nAVERAGE PRICE OF BOOKS BY GENRE: ', agg1);

        //Create an aggregation pipeline to find the author with the most books in the collection
        const agg2 = await collection.aggregate([
            { $group: { _id: "$author", bookCount: { $sum: 1 } } },
            { $sort: { bookCount: -1 } },
            { $limit: 1 }
        ]).toArray();
        console.log('\nAUTHOR WITH THE MOST BOOKS: ', agg2);
        
        //Implement a pipeline that groups books by publication decade and counts them
        const agg3 = await collection.aggregate([
            { $group: { 
                _id: { $concat: [ { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } }, "s" ] },
                count: { $sum: 1 } 
            } },
            { $sort: { _id: 1 } }
        ]).toArray();
        console.log('\nBOOKS GROUPED BY PUBLICATION DECADE: ', agg3);

        //Task 5: Indexing
        //Create an index on the title field for faster searches
        await collection.createIndex({title: 1});
        console.log('\nIndex created on the title field for faster searches');

        //Create a compound index on author and published_year
        await collection.createIndex({author: 1, published_year: -1});
        console.log('\nCompound index created on author and published_year');

        //Use the explain() method to demonstrate the performance improvement with your indexes
        const explainResult = await collection.find({title: '1984'}).explain("executionStats");
        console.log('\nEXPLAIN OUTPUT FOR QUERY ON TITLE "1984": ', explainResult);

    }catch(err){
        console.error('An error occured: ', err);

    }finally{
        client.close();
        console.log('\nconnection closed')
    }
    

}

main().catch(console.error);