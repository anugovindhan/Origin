package in.chandanpal.loginregisterjwtmysql.model;

import java.io.Serializable;

public class AuthenticationRequest implements Serializable {

	private static final long serialVersionUID = 1L;
	private String userEmail;
    private String password;

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    //need default constructor for JSON Parsing
    public AuthenticationRequest()
    {

    }

    public AuthenticationRequest(String userId, String password) {
        this.setUserEmail(userEmail);
        this.setPassword(password);
    }
}
