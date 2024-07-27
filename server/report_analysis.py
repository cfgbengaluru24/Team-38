from flask import Flask, request, jsonify
import json
from helpers import translate, call_openai

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
        
        response = call_openai(system_prompt, trainee_report)
        insights = json.loads(response)
        
        return jsonify(insights), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)