package in.chandanpal.loginregisterjwtmysql.model;

import java.io.Serializable;

public class RegistrationRequest implements Serializable {

	private static final long serialVersionUID = 1L;
	private String userEmail;
	private String firstName;
	private String lastName;
    private String password;

    public String getUserEmail()
    {
        return userEmail;
    }

    public void setUserEmail(String userEmail)
    {
        this.userEmail = userEmail;
    }

    public String getFirstName()
    {
        return firstName;
    }

    public void setFirstName(String firstName)
    {
        this.firstName = firstName;
    }

    public String getLastName()
    {
        return lastName;
    }

    public void setLastName(String lastName)
    {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    //need default constructor for JSON Parsing
    public RegistrationRequest()
    {

    }

    public RegistrationRequest(String userId, String password) {
        this.setUserEmail(userEmail);
        this.setPassword(password);
    }
}
