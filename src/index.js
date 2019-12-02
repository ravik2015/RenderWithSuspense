import React, {Suspense} from 'react';
import {View, Text} from 'react-native';
import {fetchProfileData} from './fakeApi';

const resource = fetchProfileData();

const ProfilePage = () => {
  return (
    <Suspense fallback={<Text style={{fontSize: 24}}>Loading profile...</Text>}>
      <ProfileDetails />
      <Suspense fallback={<Text style={{fontSize: 24}}>Loading posts...</Text>}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  );
};

function ProfileDetails() {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read();
  return (
    <View>
      <Text style={{fontSize: 24}}>{user.name}</Text>
    </View>
  );
}

function ProfileTimeline() {
  // Try to read posts, although they might not have loaded yet
  const posts = resource.posts.read();
  return (
    <View>
      {posts.map(post => (
        <Text key={post.id} style={{fontSize: 24}}>
          {post.text}
        </Text>
      ))}
    </View>
  );
}
export default ProfilePage;
