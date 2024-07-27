from flask import Flask, request, jsonify
import json
from helpers import translate, handle_messages, report_analysis

app = Flask(__name__)



@app.route('/analyze_report', methods=['POST'])
def analyze_report():
    try:
        if 'audio' not in request.files:
            return jsonify({"error": "No audio file provided"}), 400
        
        audio_file = request.files['audio']
        
        trainee_report = translate(audio_file)
        
        system_prompt = """
        You are an assistant for an NGO Best Practices Foundation.
        You are given a report of a trainee's week's summary about how their business has performed. Your task is to extract insights from the report given by the trainee.
        Only extract insights related to the business and how it performs, never the personal details of the trainee.
        For example, for the report of a vegetable business, the insights you might extract based on the report given by the trainee might be:
        - The trainee's business profits in the past week
        - The trainee's business expenses in the past week
        - Types and units of vegetables sold in the past week
        
        Similarly, figure out more insights as needed and add fields as needed, based on the report. Extract up to 10 insights max.
        Output in the following JSON format:
        {
            "insights": [
                {"name": "Insight 1", "value": "Value 1"},
                {"name": "Insight 2", "value": "Value 2"},
                ...
            ]
        }
        """
        
        response = report_analysis(system_prompt, trainee_report)
        insights = json.loads(response)
        
        return jsonify(insights), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        data = request.json
        user_message = data.get('message')
        chat_history = data.get('history', [])

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Prepare the messages for the API call
        messages = [
            {"role": "system", "content": "You are a helpful assistant for the Best Practices Foundation NGO."}
        ]
        
        # Add chat history
        for message in chat_history:
            messages.append({"role": "user", "content": message["user"]})
            if "assistant" in message:
                messages.append({"role": "assistant", "content": message["assistant"]})
        
        # Add the current user message
        messages.append({"role": "user", "content": user_message})

        response = handle_messages(messages)

        assistant_response = response.choices[0].message.content

        # Update chat history
        chat_history.append({"user": user_message, "assistant": assistant_response})

        return jsonify({
            "response": assistant_response,
            "history": chat_history
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)