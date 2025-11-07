import React from 'react';
import { Navigation } from './Navigation';
import Card from './card';
import { Footer } from './footer';

export class Home extends React.Component {
  
  //seperate the search query from the Home component
  render() {
    return (
     <div className="Home" style={{ backgroundColor: "#dcefffff"}}>
       <Card/>
        <div  style={{display: "flex",justifyContent: "center", marginTop: "50px",marginBottom: "10px", flexWrap: "wrap"}}>

        <button style={{ backgroundColor: "#1a237e",color: "#fff",padding: "10px 20px",border: "none",borderRadius: "5px",cursor: "pointer",margin: "20px"}} >
          &larr; Previous
        </button>

        <button style={{backgroundColor: "#1a237e", color: "#fff", padding: "5px 5px", border: "none", borderRadius: "5px", cursor: "pointer", margin: "20px",}}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Back to Top
          </button>

          <button style={{backgroundColor: "#1a237e",color: "#fff",padding: "10px 20px",border: "none",borderRadius: "5px",cursor: "pointer",margin: "20px"}}>
          &rarr; Next
          </button>
          
  </div>
      <Footer/>
      </div>
     );
  }
}

