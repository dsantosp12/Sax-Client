from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
@app.route('/summary')
def summary():
    return render_template("summary.html", title="Summary")


if __name__ == '__main__':
    app.run()
