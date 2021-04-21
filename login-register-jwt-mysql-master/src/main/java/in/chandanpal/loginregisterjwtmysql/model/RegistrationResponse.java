package in.chandanpal.loginregisterjwtmysql.model;

import java.io.Serializable;

public class RegistrationResponse implements Serializable {

	private static final long serialVersionUID = 1L;
	private long userId;
	private boolean error;
	private String message;
	
	public long getUserId()
    {
        return userId;
    }

    public void setUserId(long userId)
    {
        this.userId = userId;
    }

    public String getMessage()
    {
        return message;
    }

    public void setMessage(String message)
    {
        this.message = message;
    }
    
    public RegistrationResponse()
    {

    }

    public RegistrationResponse(long userId, String message) {
        this.setUserId(userId);
        this.setMessage(message);
    }

    public boolean isError()
    {
        return error;
    }

    public void setError(boolean error)
    {
        this.error = error;
    }
}
