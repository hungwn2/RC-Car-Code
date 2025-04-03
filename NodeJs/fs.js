const fs=require('fs/promises');
async function example() {
    const fileName = '/Users/joe/test.txt';
    try {
      const data = await fs.readFile(fileName, 'utf8');
      console.log(data);
      const content = 'Some content!';
      await fs.writeFile(fileName, content);
      console.log('Wrote some content!');
      const newData = await fs.readFile(fileName, 'utf8');
      console.log(newData);
    } catch (err) {
      console.log(err);
    }
  }
  example();

  const content = 'Some content!';
fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err);
  } else {
    // done!
  }
});

async function example(){
    try{
        const content='SOme content';
        await fs.appendFile('/Users/joe/test.txt');
    }catch(err){
        console.log(err);
    }
}
example();


fs.readFile('', 'utf8', (err, data)=>{
    if (err){
        console.error(err);
        return;
    }
    console.log(data);
})
//or readFileSync

const myURL = new URL({ toString: () => 'https://example.org/' });
// https://example.org/

let myURL=new URL('http://Example.com')