import React,{useEffect} from "react";
import { Card1 } from '../cards/Card1';
import { Card2 } from '../cards/Card2';

export function Logo() {
    let liName=["li1","li2","li3","li4","li5"];//for change background color og current component in navbar
    useEffect(() => {
        liName.map((curr) => {
            if(curr==="li1"){
            dqs(curr).style.backgroundColor = "#816FCA";
            }else{
                dqs(curr).style.backgroundColor = "#FFFFFF";
            }
        });
      }, []);
    function dqs(ele){
        return document.querySelector(`#${ele}`);
    }
    return(
        <div className="cards">
            <div className="card1">
                <Card1 />
            </div>
            <div className="card2">
                <Card2 />
            </div>
        </div>

    );
}