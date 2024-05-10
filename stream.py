import streamlit as st
import pandas as pd
import joblib
from preproccess import FullPipeline1 ,DateExtractor , CustomOneHotEncoder , DropColumnsTransformer ,OutlierThresholdTransformer , DataFrameImputer , StandardScaleTransform

# Load the trained model
model = joblib.load('model_joblib.pkl')

# Load the preprocessing pipeline
pipeline = joblib.load('pipeline.pkl')

st.title('Power Prediction App')

def main():
    st.sidebar.header('Input Parameters')
    
    wind_speed = st.sidebar.slider('Wind Speed', min_value=0.0, max_value=30.0, step=0.1, value=10.0)
    theoretical_power = st.sidebar.slider('Theoretical Power', min_value=0.0, max_value=1000.0, step=1.0, value=500.0)
    wind_direction = st.sidebar.slider('Wind Direction', min_value=0.0, max_value=360.0, step=1.0, value=180.0)
    date_time = st.sidebar.text_input('Date/time', value='2024-05-03 12:00')

    data = pd.DataFrame({'Wind speed': [wind_speed],
                         'Theoretical power': [theoretical_power],
                         'Wind direction': [wind_direction],
                         'Date/time': [date_time]})

    f1 = FullPipeline1()
    transformed_data = f1.fit_transform(data)

    if st.button('Predict'):
        lv_active_power = model.predict(transformed_data)
        st.success(f'The predicted LV Active Power is {lv_active_power[0]}')

if __name__ == '__main__':
    main()
