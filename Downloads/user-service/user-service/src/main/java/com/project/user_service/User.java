package com.project.user_service;

//This is the modal class .where we write the all requried attributes.
public class User {


    private String userId;
    private String userName;
    private String userPhoneNumber;
    private PostS postS;
    private Notifications notifications;



    //created a constructor for the attributes
    //in intellij select and generate -> constructor ->select what we need and add.
    public User(String userId, String userName, String userPhoneNumber) {
        this.userId = userId;
        this.userName = userName;
        this.userPhoneNumber = userPhoneNumber;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPhoneNumber() {
        return userPhoneNumber;
    }

    public void setUserPhoneNumber(String userPhoneNumber) {
        this.userPhoneNumber = userPhoneNumber;
    }

    public Notifications getNotifications() {
        return notifications;
    }

    public void setNotifications(Notifications notifications) {
        this.notifications = notifications;
    }

    public PostS getPostS() {
        return postS;
    }

    public void setPostS(PostS postS) {
        this.postS = postS;
    }







}
