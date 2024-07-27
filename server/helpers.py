from openai import OpenAI
from dotenv import load_dotenv
from os import getenv

load_dotenv()
OPENAI_API_KEY = getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)


def translate(audio_file):
    try:
        translation = client.audio.translations.create(
            model="whisper-1", 
            file=audio_file
        )
        return translation.text
    except Exception as e:
        raise Exception(f"Translation error: {str(e)}")

def report_analysis(system_prompt, trainee_report):
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": trainee_report}
            ],
            temperature=0,
            response_format={"type": "json_object"}
        )
        return response.choices[0].message.content
    except Exception as e:
        raise Exception(f"OpenAI API error: {str(e)}")
    
def handle_messages(messages):
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                messages
            ],
            temperature=0,
            response_format={"type": "json_object"}
        )
        return response.choices[0].message.content
    except Exception as e:
        raise Exception(f"OpenAI API error: {str(e)}")