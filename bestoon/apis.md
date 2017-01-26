/submit/expense/
  POST, returns a Json
  input: date(optional), text,amount,user
  output: status:ok

  /submit/income/
    POST, returns a Json
    input: date(optional), text,amount,user
    output: status:ok

/accounts/register/
  step1:
    POST
    input: username,email, password
    outputL status:ok
  step2: #click on activation link on email
    GET
    input: email,
    output: status: ok (shows the token)


/q/generalstat/
  POST: return json
  input: gromdate(optional), todate(optional), token
  output: json from general stats related to this user
