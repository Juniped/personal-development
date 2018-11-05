from sqlalchemy import Column, Integer, String
from db_components.database import Base
import random, string

class Example(Base):
    __tablename__ = "example"
    id = Column(Integer, primary_key=True)
    data = Column(String(50))

    def __init__(self, data=None):
        self.data = data
    
    def __repr__(self):
        return f"<Example Data: {self.data}>"

    def to_dict(self):
        ret_dict = {
            'data': self.data,
            'id': self.id,
        }
        return ret_dict