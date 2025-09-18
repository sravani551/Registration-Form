package com.project.user_service;

public class Notifications {
    private String notificationId;
    private String description;

    public Notifications(String notificationId, String description) {
        this.description = notificationId;
        this.notificationId = description;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(String notificationId) {
        this.notificationId = notificationId;
    }




}
