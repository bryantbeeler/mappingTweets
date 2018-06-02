import React, { Component } from 'react';

class TwitterHandle extends React.Component{
    constructor(props){
        super(props);

        // props.twitterHandle: Data from twitter API
        // console.log(props.twitterHandle);
    }



    render(){
        let tweetTime = [];
        let splitTime = this.props.twitterHandle.created_at.split(' ');

        for(let i = 0; i < 4; i++){
            tweetTime.push(splitTime[i]);
        }


        return(
            <div className = "tweetBox">
               <div className = "tweetBoxDockLeft"> 
                   <h5>@{this.props.twitterHandle.screen_name}</h5>
                    <p>"{this.props.twitterHandle.tweet_text}"</p>
                </div>
                <div className = "tweetBoxDockRight">
                    <h5>-{tweetTime.join(" ")}</h5>
                </div>
            </div>
        )
    }
}

export default TwitterHandle