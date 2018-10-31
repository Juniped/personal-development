class Example:
    def __init__(self, random_data):
        self.random_data = random_data

    def to_json(self):
        return {"Example": 
            {"random_data": self.random_data}
        }