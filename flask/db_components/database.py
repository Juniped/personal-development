from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('sqlite:////tmp/test.db', convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    # import all modules here that might define models so that
    # they will be registered properly on the metadata.  Otherwise
    # you will have to import them first before calling init_db()
    # Pylint comment is to ignore "unused import error" during linting
    import db_components.models # pylint: disable=W0612
    Base.metadata.create_all(bind=engine)

def add_data(new_data):
    from db_components.models import Example
    ex = Example(new_data)
    db_session.add(ex)
    db_session.commit()
    print(ex.to_dict())
    return ex

def get_all_data():
    from db_components.models import Example
    return Example.query.all()

def delete_data(id):
    from db_components.models import Example
    to_delete = Example.query.filter_by(id=id).first()
    db_session.delete(to_delete)
    db_session.commit()
