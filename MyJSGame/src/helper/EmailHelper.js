/**
 * Created by vivekfitkariwala on 07/08/15.
 */
helper.EmailHelper = helper.EmailHelper || {};

puremvc.define(
    //class info
    {
        name: "helper.EmailHelper"
    },

    //instance member
    {
    },

    //static member
    {
        NAME: "HELPER_EMAIL_HELPER",
        videoShare: function (data) {
            data = JSON.parse(data);
            if(!data.parent_email) // Parent email is not set
                return;
            helper.EmailHelper.sendRequestParse({
                type:'ShareVideo',
                parent_email:data.parent_email,
                kid_name:data.kid_name,
                kid_gender:data.kid_gender,
                topic:data.topic,
                subtopic:data.subtopic,
                title:data.title,
                thumburl:data.thumburl,
                url:data.url
            });
        },
        waitList: function (data) {
            data = JSON.parse(data);
            if(!data.parent_email) // Parent email is not set
                return;
            helper.EmailHelper.sendRequestParse({
                type:'waitlist',
                parent_email:data.parent_email,
                kid_name:data.kid_name,
                kid_gender:data.kid_gender
            });
        },
        feedback: function (data) {
            data = JSON.parse(data);
            helper.EmailHelper.sendRequest({
                type:'feedback',
                parentEmail:data.parent_email,
                ContentID:data.ContentID,
                ContentTitle:data.title,
                ContentTopic:data.topic,
                ContentType:data.type,
                ContentSubTopic:data.subtopic,
                feedbackText:data.feedbackText
            });
        },
        gameScoreShare: function (data){
            data = JSON.parse(data);
            if(!data.parent_email) // Parent email is not set
                return;
            helper.EmailHelper.sendRequest({
                type:'scoreShare',
                parentEmail:data.parent_email,
                subject: 'Share Score',
                score:data.score,
                gameLink:data.gameLink,
                gameName:data.gameName,
                thumbURL:data.thumbURL,
                topic:data.topic,
                kidAge:data.kidAge,
                kidName:data.kidName
            });
        },

        sendRequest: function (data) {
            var request = "https://brainbuilder.herokuapp.com/share/";
            if(data.type === 'scoreShare'){
                request += 'score';
            } else if(data.type === 'feedback'){
                request += 'feedback';
            }

            data = JSON.stringify(data);
            var xhrRequest = cc.loader.getXMLHttpRequest();
            xhrRequest.onerror = function (error) {
                cc.log("Error:"+error);
            };

            xhrRequest.open("POST", request);
            xhrRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhrRequest.setRequestHeader("Cache-Control", "no-cache");
            xhrRequest.setRequestHeader("Content-Type", "application/json");
            xhrRequest.send(data);
        },
        sendRequestParse: function (data) {
            data = JSON.stringify(data);
            var xhrRequest = cc.loader.getXMLHttpRequest();
            xhrRequest.onerror = function (error) {
                cc.log("Error:"+error);
            };
            xhrRequest.open("POST", "https://api.parse.com/1/functions/sendEmail");
            xhrRequest.setRequestHeader("X-Parse-Application-Id","2ZFXqLGVFM7n7T8h3Vjky9IJDBYf8lpQUR3KbeqS");
            xhrRequest.setRequestHeader("X-Parse-REST-API-Key", "N2MOGjAj8h4ti1dRVDBvH60UTd5rk7UmHnUQNJ9l");
            xhrRequest.setRequestHeader("Content-Type", "application/json");
            xhrRequest.send(data);
        }
    }
)