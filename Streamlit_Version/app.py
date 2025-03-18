import pickle
import streamlit as st
import pandas as pd

# Load the model
with open('lilo_model.sav', 'rb') as f:
    model = pickle.load(f)

# Define the title and description
st.title('Wind Turbine Power Prediction Web Application')
st.write("Harnessing Renewable Energy with **Machine Learning**")

# Text input fields for user input
wind_speed = st.text_input('Wind Speed (m/s)', placeholder="Enter wind speed")
theoretical_power_curve = st.text_input('Theoretical Power Curve (KWh)', placeholder="Enter theoretical power curve")
wind_direction = st.text_input('Wind Direction (°)', placeholder="Enter wind direction")
month = st.number_input('Month', min_value=1, max_value=12, step=1, format='%d', help="Enter month number (1-12)")

# Button to confirm and trigger prediction
con = st.button('Confirm')
if con:
    # Create a DataFrame with user inputs
    df = pd.DataFrame({'Wind Speed (m/s)': [wind_speed],
                        'Theoretical Power Curve (KWh)': [theoretical_power_curve],
                        'Wind Direction (°)': [wind_direction],
                        'Month': [month]})

    # Convert input data to float
    df = df.astype(float)

    # Make prediction using the model
    result = model.predict(df)

    # Display the prediction result
    st.write(f"Predicted Wind Turbine Power (Low Voltage Active Power): **{result[0]:.2f} kW**")
