import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.calibration import LabelEncoder
from sklearn.discriminant_analysis import StandardScaler
from sklearn.impute import KNNImputer, SimpleImputer
from sklearn.pipeline import Pipeline
import pandas as pd
import joblib
from pipe import FullPipeline1 , LabelEncodeColumns ,CustomOneHotEncoder , DropColumnsTransformer ,OutlierThresholdTransformer ,DateExtractor, DataFrameImputer,StandardScaleTransform

# Load the trained model
model = joblib.load('one_hot_model.pkl')

# Load the preprocessing pipeline
pipeline = joblib.load('one_hot_pipeline.pkl')

sample_data = {
    'Date/Time': ['01 01 2018 00:10'],
    'Wind Speed (m/s)': [5.672167],
    'Theoretical_Power_Curve (KWh)': [519.917511],
    'Wind Direction (°)': [268.641113]
    }
df = pd.DataFrame(sample_data)
    
    #result_html = data.to_html(index=False)
f1 = FullPipeline1()
    # Preprocess data using your pipeline
transformed_data = f1.transform(df)

    # Predict LV Active Power using your model
lv_active_power = model.predict(transformed_data)
print(lv_active_power)