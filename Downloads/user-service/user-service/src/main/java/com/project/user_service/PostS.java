package com.project.user_service;

public class PostS {
    private String postId;
    private String description;

    public PostS(String postId, String description) {
        this.postId = postId;
        this.description = description;

    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }


}
