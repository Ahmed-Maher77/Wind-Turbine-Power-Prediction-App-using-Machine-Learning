from flask import Flask, request, render_template
import pandas as pd
from datetime import datetime
import joblib
from pipe import FullPipeline1, LabelEncodeColumns, CustomOneHotEncoder, DropColumnsTransformer, OutlierThresholdTransformer, DateExtractor, DataFrameImputer, StandardScaleTransform

app = Flask(__name__)

# Load the trained model
model = joblib.load('one_hot_model.pkl')

# Load the preprocessing pipeline
pipeline = joblib.load('one_hot_pipeline.pkl')

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')

# Route for the form submission and prediction
@app.route('/result', methods=['POST'])
def predict():
    # Get data from the form
    date_time = request.form['date_time']
    wind_speed = float(request.form['wind_speed'])
    theoretical_power = float(request.form['theoretical_power'])
    wind_direction = float(request.form['wind_direction'])

    # Convert date/time to the desired format
    original_datetime = datetime.strptime(date_time, "%Y-%m-%dT%H:%M")
    formatted_datetime_str = original_datetime.strftime("%d %m %Y %H:%M")

    # Create a DataFrame with the form data
    data = pd.DataFrame({'Date/Time': [formatted_datetime_str],
                         'Wind Speed (m/s)': [wind_speed],
                         'Theoretical_Power_Curve (KWh)': [theoretical_power],
                         'Wind Direction (°)': [wind_direction]
                         })
    
    # Preprocess data using the pipeline
    transformed_data = pipeline.transform(data)
    # Predict LV Active Power using the model
    lv_active_power = model.predict(transformed_data)

    return render_template('result.html', lv_active_power=lv_active_power)

if __name__ == '__main__':
    app.run(debug=True)
